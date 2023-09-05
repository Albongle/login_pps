import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePage } from './welcome.page';
import { IonicModule } from '@ionic/angular';
import { WelcomePageRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [WelcomePage],
  imports: [CommonModule, IonicModule, WelcomePageRoutingModule],
})
export class WelcomeModule {}
