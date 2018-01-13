import { NeighborhoodService } from './services/api/neighborhood.service';
import { UserService } from './services/api/user.service';
import { SectorService } from './services/api/sector.service';
import { ImageService } from './services/api/image.service';
import { ScrapService } from './services/api/scrap.service';
import { StorageService } from './services/storage.service';
import { RecycleService } from './services/api/recycle.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

import { CloudinaryPipe } from './pipes/cloudinary.pipe';
import { RoutesModule } from '../routes/routes.module';
import { UsersModule } from '../users/users.module';
import { SectorsModule } from '../sectors/sectors.module';
import { NeighborhoodModule } from '../neighborhood/neighborhood.module';
import { ScrapsModule } from '../scraps/scraps.module';
import { HomeModule } from '../home/home.module';
import { AuthModule } from '../auth/auth.module';
import { RegisterModule } from '../register/register.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgNotifyPopup } from 'ng2-notify-popup';
import { NotificationService } from 'ng2-notify-popup';


// IMPORTS MODULES
export const SHARED_IMPORT_MODULES = [
  HttpModule,
  ReactiveFormsModule,
  NgNotifyPopup,
  RoutesModule,
  UsersModule,
  SectorsModule,
  NeighborhoodModule,
  ScrapsModule,
  RegisterModule,
  HomeModule,
  AuthModule
];

// PROVIDERS
export const SHARED_PROVIDERS = [
  UserService,
  SectorService,
  NotificationService,
  ImageService,
  ScrapService,
  StorageService,
  RecycleService,
  NeighborhoodService,
  AuthService,
  AuthGuard,
  HomeGuard
];
