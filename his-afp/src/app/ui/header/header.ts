import { Component } from '@angular/core';
import { DarkmodeSelector } from '../darkmode-selector/darkmode-selector.component';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'his-header',
  imports: [DarkmodeSelector, RouterLink, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
