import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  disableBalanceOnEdit =  this.settingsService.getSettings().disableBalanceOnEdit;

  ngOnInit() {
     // get id from url
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    // get client
    this.clientService.getClient(this.id).subscribe(client =>
       this.client = client);
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      //Add id to client
      value.id = this.id;
      //Update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client Updated',{
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
