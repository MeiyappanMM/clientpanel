import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved',{
      cssClass: 'alert-success',timeout: 4000
    });
  }

}
