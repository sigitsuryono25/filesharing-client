import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  form!: FormGroup;
  modalRef?: BsModalRef;

  events: any[] = [];
  currentEvent: any = { id: null, name: '', descriptions: '', date: new Date() };
  modalCallback!: () => void;

  constructor(private fb: FormBuilder, private modalService: BsModalService, private server: ServerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.currentEvent.name, Validators.required],
      descriptions: [this.currentEvent.descriptions, Validators.required],
      date: [this.currentEvent.date, Validators.required],
    });
    this.getEvents();
  }

  private updateForm() {
    this.form?.setValue({
      name: this.currentEvent.name,
      descriptions: this.currentEvent.descriptions,
      date: new Date(this.currentEvent.date),
    })
  }

  private getEvents() {
    this.server.getEvents().then((response: any) => {
      console.warn(response);
      this.events = response.map((ev: any) => {
        ev.body = ev.descriptions;
        ev.header = ev.name;
        ev.icon = 'fa-clock-o';
        return ev;
      })
    });
  }

  addEvent(template: any) {
    this.currentEvent = { id: null, name: '', descriptions: '', date: new Date() };
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createEvent() {
    const newEvent = {
      name: this.form?.get('name')?.value,
      descriptions: this.form?.get('descriptions')?.value,
      date: this.form?.get('date')?.value,
    }

    this.modalRef?.hide();
    this.server.createEvent(newEvent).then(() => {
      this.getEvents();
    });
  }

  editEvent(index: number, template: any) {
    this.currentEvent = this.events[index];
    this.updateForm();
    this.modalCallback = this.updateEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateEvent() {
    const eventData = {
      id: this.currentEvent.id,
      name: this.form?.get('name')?.value,
      descriptions: this.form?.get('descriptions')?.value,
      date: this.form?.get('date')?.value
    };
    this.modalRef?.hide();
    this.server.updateEvent(eventData).then(() => {
      this.getEvents();
    });
  }

  deleteEvent(index: number){
    this.server.deleteEvent(this.events[index]).then(()=>{
      this.getEvents();
    })
  }

  onCancel(){
    this.modalRef?.hide();
  }
}
