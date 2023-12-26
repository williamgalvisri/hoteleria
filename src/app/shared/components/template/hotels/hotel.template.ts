import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '@models/hotel.model';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { FormHotelOrganism } from '@shared/components/organisms/form-hotel/form-hotel.organism';
import { ID_MODAL_FORM_HOTEL } from '@shared/components/utils/modal-keys.const';
import { Modal } from 'flowbite';
import { Subscription, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'tp-hotel',
  imports: [ButtonAtom, LabelAtom, CardAtom, ModalMolecule, FormHotelOrganism, CommonModule],
  providers:[],
  templateUrl: './hotel.template.html',
  styleUrl: './hotel.template.css'
})

export class HotelTemplate implements OnInit, AfterViewInit, OnDestroy {
  hotels: Hotel[] = [];
  hotel: Hotel = new Hotel();
  loadingState: { edit: boolean,  activateOrDeactivate: boolean};
  formHotelInstanceModal!: Modal;


  subscriptionListenerHotels!: Subscription;
  constructor(
    private modalService: ModalService,
    private hotelRepository: HotelRepository,
    private router: Router
  ) {
    this.loadingState = {
      edit: false,
      activateOrDeactivate: false
    };
  }

  ngOnInit() {
    this.getHotels();
  }

  ngOnDestroy(): void {
    this.subscriptionListenerHotels?.unsubscribe();
    this.hotelRepository.unsubscribeSnapshot();
  }

  ngAfterViewInit(): void {
    this.formHotelInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_HOTEL, {closable: false});
  }


  // ------------------- Fetch Methods ---------------------
  /**
   * Fetches a list of hotels from the data source and stores them locally.
   *
   * @description
   *   - Calls the `getAllHotels()` method on the `hotelRepository` to retrieve hotel data.
   *   - Subscribes to the resulting Observable to handle the asynchronous response.
   *   - Assigns the received hotel data to the `hotels` member variable.
   *
   * @example
   *   ```typescript
   *   this.getHotels(); // Fetch hotels and store them in this.hotels
   *   console.log(this.hotels); // Access the fetched hotels
   *   ```
   */
  getHotels() {
    this.subscriptionListenerHotels = this.hotelRepository.listenerHotels$().subscribe((hotels) => {
      this.hotels = hotels;
    })
  }

  editHotel(id: string) {
    // Beggin search data
    this.loadingState.edit = true;
    this.hotelRepository.getByIdHotel(id).pipe(
      tap(({response}) => {
        // off loading state and open modal
        this.loadingState.edit = false;
        this.hotel = response;
        this.formHotelInstanceModal.show();
      })
    ).subscribe()
  }

  deactivateOrActivate(id: string, previewState: boolean) {
    this.loadingState.activateOrDeactivate = true;
    this.hotelRepository.activateOrDeactivateHotel(id, previewState).pipe(
      tap(() => {
        // off loading state
        this.loadingState.activateOrDeactivate = false;
      })
    ).subscribe()
  }

  goToRooms(id: string) {
    this.router.navigate([`admin/hotels/${id}`]);
  }

  // -------------------- Modal Methods --------------------
  openFormHotelModal() {
    this.hotel = new Hotel();
    this.formHotelInstanceModal.show();
  }

  closeFormHotelModal() {
    this.formHotelInstanceModal.hide();
  }
}
