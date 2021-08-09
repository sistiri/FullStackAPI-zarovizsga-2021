import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car: Car = new Car();
  userID: number = 0;

  constructor(
    private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.carService.get(params.id).subscribe(
          car => {
            // console.log(car);
            this.car = car || new Car();
          }
        )
    );
  }

  onSubmit(): void {
    this.carService.update(this.car).subscribe(
      car => this.router.navigate(['/', 'cars']),
      err => console.error(err)
    );
  }

}
