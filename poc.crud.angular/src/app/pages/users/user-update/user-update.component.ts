import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})

export class UserUpdateComponent implements OnInit {
  
  public id: number = 0;
  private _route: ActivatedRoute;

  constructor(route: ActivatedRoute){
    this._route = route;
  }
  
  ngOnInit(): void {
    this.id = Number(this._route.snapshot.paramMap.get('id') || '');
  }
}