import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  specialEvents = []
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getSpecialEvents()
    .subscribe (
      res => this.specialEvents = res,
      err => console.log(err)
    )
  }

}
