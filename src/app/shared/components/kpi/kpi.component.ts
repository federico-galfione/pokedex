import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'poke-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  @Input()
  value: string | number = "800";
  @Input()
  measureUnit: string;
  @Input()
  label: string = "Weight";

  constructor() { }

  ngOnInit(): void {
  }

}
