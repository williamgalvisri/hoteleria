import { ActivatedRoute, Route, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RoomRepository } from '@repositories/room/room.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { of, switchMap, tap } from 'rxjs';
import { RepositoryModule } from '@repositories/repository.module';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { Room } from '@models/room.model';
import { Modal } from 'flowbite';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { ID_MODAL_FORM_ROOM } from '@shared/components/utils/modal-keys.const';

const COMPONENTS = [
  LabelAtom,
  ButtonAtom,
  ModalMolecule,
];

const MODULE = [
  RepositoryModule
];
@Component({
  standalone: true,
  selector: 'tp-rooms',
  imports: [ ...MODULE, ...COMPONENTS],
  templateUrl: 'rooms.template.html'
})
export class RoomsTemplate implements OnInit, AfterViewInit {
  rooms: Room[] = [];

  formRoomInstanceModal!: Modal;
  constructor(
    private activatedRoute: ActivatedRoute,
    private roomRepository: RoomRepository,
    private modalService: ModalService,
    private router: Router,
  ) {
    this.activatedRoute.params
    .pipe(
      switchMap((param) => {
        const id = param['id'];
        if (id) {
          return this.roomRepository.setHotelIdentifier(id)
        } else {
          return of(false)
        }
      }),
      tap((validateExist) => {
        if(!validateExist) {
          this.router.navigate(['admin/hotels'])
        }
      })
    ).subscribe()

  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.formRoomInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_ROOM, {closable: false});
  }


  // -------------------- Modal Methods --------------------
  openFormRoomModal() {
    // this.hotel = new Hotel();
    console.log(this.formRoomInstanceModal);
    this.formRoomInstanceModal.show();
  }

  closeFormRoomModal() {
    this.formRoomInstanceModal.hide();
  }

}
