import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '@models/reserva.model';
import { RepositoryModule } from '@repositories/repository.module';
import { ReservaRepository } from '@repositories/reserva/reserva.repository';
import { BreadcrumService } from '@shared/components/atoms/breadcrum/service/breadcrum.service';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { SkeletonAtom } from '@shared/components/atoms/skeleton/skeleton.atom';
import { FormRoomOrganism } from '@shared/components/organisms/form-room/form-room.organism';
import { GetTextFromOptionPipe } from '@shared/pipes/get-text-from-options.pipe';
import { of, switchMap, tap } from 'rxjs';

const COMPONENTS = [
  LabelAtom,
  ButtonAtom,
  ModalMolecule,
  FormRoomOrganism,
  CardAtom,
  GetTextFromOptionPipe,
  SkeletonAtom
];

const MODULE = [
  RepositoryModule,
  CommonModule
];
@Component({
  standalone: true,
  imports: [...COMPONENTS, ...MODULE],
  selector: 'tp-reservas',
  templateUrl: './reservas.template.html',
  styleUrl: './reservas.template.css'
})

export class ReservasTemplate implements OnInit {
  reservas: Reserva[] = [];
  isLoading: boolean = true;
  constructor(
    private reservaRepository: ReservaRepository,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumService: BreadcrumService
  ) { }

  ngOnInit() {
    this.getReservas();
  }

  getReservas() {
    this.activatedRoute.params
    .pipe(
      switchMap((param) => {
        const id = param['id'];
        const idHotel = param['idHotel'];
        // set idHotle for the correct functionality breadCrum
        this.breadcrumService.setIdBreadCrum(idHotel, 'idHotel');
        if (id) {
          return this.reservaRepository.setRoomIdentifier(id, idHotel)
        } else {
          return of(false)
        }
      }),
      switchMap((validateExist) => {
        if(!validateExist) {
          this.router.navigate(['admin/hotels'])
          return of()
        } else {
          return this.reservaRepository.getAllReservas().pipe(tap(({response, status}) => {
            if(status === 'success') {
              this.reservas = response;
            }
            this.isLoading = false;
          }))
        }
      })
    ).subscribe()
  }
}
