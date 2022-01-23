import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import {
  delay,
  finalize,
  skip,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { LoadingToastComponent } from '../components/loading-toast/loading-toast.component';
import { BaseDirective } from '../directives/base.directive';

interface LoadingOptions {
  hideToast?: boolean;
  message?: string;
}

interface LoadingInfo {
  isLoading: BehaviorSubject<boolean>;
  options?: LoadingOptions;
  toast?: ComponentRef<LoadingToastComponent>;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /* Each component has a map for its loadings. Every loading has a name and it's a BehaviorSubject (true if loading, false if not).
   * Ex: In employee-page I could have a loading for retrieve guest key and send my order. So the WeakMap will have this structure:
   * <employee-page-instance>: {
   *    'RetrieveGuestKey': <BehaviorSubject<boolean>>,
   *    'SendOrder': <BehaviorSubject<boolean>>
   * }
   */
  loadings: WeakMap<BaseDirective, Map<string, LoadingInfo>> = new WeakMap();

  loadingHost: ViewContainerRef | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  /**
   * Start the loading
   *
   * @param context: The context where the loader is used (usually a service instance)
   * @param loadingName: If the context has more than one possible loading, set a name to distinguish them
   * @param asyncFunc: An observable with the response from the server
   * @param options the loading options
   */
  public startLoading<T>(
    context: BaseDirective,
    loadingName: string,
    asyncFunc: Observable<T>,
    options?: LoadingOptions,
    isPromise = true
  ): Observable<T> {
    loadingName = loadingName ? loadingName : 'UniqueLoading';
    // Check if exist the selected loading
    if (!this.loadings.get(context)?.get(loadingName)) {
      this.addToMap(context, loadingName, options);
    }
    const loadingMap = this.loadings.get(context).get(loadingName);
    if (options) {
      this.loadings.get(context).set(loadingName, {
        ...loadingMap,
        options,
      });
    }
    loadingMap.isLoading.next(true);
    // Return the given observable and deal with the end of loading
    return isPromise
      ? asyncFunc.pipe(
          take(1),
          finalize(() => this.endLoading(context, loadingName))
        )
      : asyncFunc.pipe(
          startWith(null as T),
          skip(1),
          tap(() => this.endLoading(context, loadingName))
        );
  }

  /**
   * End the loading
   * @param context the class where a loading is waiting
   * @param loadingName the unique loading key in that context
   */
  public endLoading(context: BaseDirective, loadingName?: string) {
    loadingName = loadingName ? loadingName : 'UniqueLoading';
    this.loadings.get(context)?.get(loadingName)?.isLoading.next(false);
  }

  /**
   * Get a loading currently waiting (useful to disable stuff)
   * @param context context where the loading is waiting
   * @param loadingName the unique loading key in that context
   * @returns 
   */
  public getLoading(context: BaseDirective, loadingName?: string) {
    loadingName = loadingName ? loadingName : 'UniqueLoading';
    if (!this.loadings.get(context)?.get(loadingName)) {
      this.addToMap(context, loadingName);
    }
    const selectedLoading = this.loadings.get(context).get(loadingName);
    return this.loadingAsObservable(selectedLoading.isLoading).pipe(
      takeUntil(context.destroy$)
    );
  }


  private loadingAsObservable(loading: BehaviorSubject<boolean>) {
    return loading.pipe(
      switchMap((loading) =>
        iif(() => loading, of(loading).pipe(delay(500)), of(loading))
      )
    );
  }

  /**
   * Create a new component toast to show the loading message
   * 
   * @param loading the loading to present
   */
  private presentToast(loading: LoadingInfo) {
    if (!loading.options?.hideToast) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          LoadingToastComponent
        );
      loading.toast =
        this.loadingHost.createComponent<LoadingToastComponent>(
          componentFactory
        );
      loading.toast.instance.message = loading.options.message;
    }
  }

  /**
   * Add the loading to the loadings map
   * 
   * @param context the context where the loading is waiting
   * @param loadingName the key of the loading
   * @param options the loading options
   */
  private addToMap(
    context: BaseDirective,
    loadingName: string,
    options?: LoadingOptions
  ) {
    let loadingsMap: Map<string, LoadingInfo>;
    if (!this.loadings.get(context)) {
      loadingsMap = this.loadings
        .set(
          context,
          new Map<string, LoadingInfo>().set(loadingName, {
            isLoading: new BehaviorSubject(false),
            options: null,
            toast: null,
          })
        )
        .get(context);
    } else {
      loadingsMap = this.loadings.get(context).set(loadingName, {
        isLoading: new BehaviorSubject(false),
        options: null,
        toast: null,
      });
    }
    if (!options?.hideToast) {
      this.loadingAsObservable(loadingsMap.get(loadingName).isLoading)
        .pipe(takeUntil(context.destroy$))
        // eslint-disable-next-line max-len
        .subscribe((isLoading) =>
          isLoading
            ? this.presentToast(loadingsMap.get(loadingName))
            : this.hideToast(loadingsMap.get(loadingName))
        );
    }
  }

  /**
   * Hide the toast when the loading is done
   * 
   * @param loading 
   */
  private hideToast(loading: LoadingInfo) {
    if (loading.toast) {
      loading.toast.destroy();
    }
    loading.toast = null;
  }
}
