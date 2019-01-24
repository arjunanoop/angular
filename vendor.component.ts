import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor, Vend } from './../../../core/models/vendor';
import { VendorService } from './../../../core/api-services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
  
export class VendorComponent implements OnInit {
    vendors: Vend[];	
    vendor:Vendor;	
    vendorRemoveModal:boolean = false;
    vendorActivateModal:boolean = false;
    vendorInactivateModal:boolean = false;
    lastPage;
    paginationEnabled:boolean = false;
    edit: Vendor = { active: 0,address: "",city: "",code: "",country: "",hotelId:"",id:0,name: "",state: "",zip: "",creditDays:0 } as Vendor;	
   constructor(private vendorService:VendorService, private router: Router) {}
  
  ngOnInit() {
	this.getVendors();
  }
  
  trackById = (index, vendor) => vendor.id;
  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }

  confirmActivateVendor(vendor): void {
    this.edit = vendor;
    this.vendorActivateModal = true;
  }
  
  confirmInactivateVendor(vendor): void {
    this.edit = vendor;
    this.vendorInactivateModal = true;
  }
  
   //Delete vendor
   deleteVendor(vendorId: Vendor) {
	   this.vendorService.deleteVendorById(vendorId)
    .subscribe(res => {
     //   this.router.navigate(['vendor']);
	    // Category was removed
        this.cancel();
	       this.getVendors();
      }, (err) => {
        console.log(err);
      }
    );
   }
   
   
  //inactivate  vendor
   inactivateVendor(vendorId) {
	this.vendorService.getVendorDetails(vendorId).subscribe(vendor => {
        if (vendor) {
		//console.log("vendor details:",vendor);
	  if(vendor.active==1){	
		vendor.active = 0;
	  }else{
		vendor.active = 1;
	  }	
          this.vendor = vendor;
	  this.vendorService.updateVendor(this.vendor).subscribe((result) => {
		  this.cancel();
		    this.getVendors();
          }, (err) => {
         console.log(err);
         });	
		
        } 
      });
   }
   
   
   /**
   * Close the modal and reset error states
   */
  cancel(): void {
   // this.categoryEditModal = false;
    this.vendorRemoveModal = false;
    this.vendorActivateModal = false;
    this.vendorInactivateModal = false;
   // this.error = null;
  }

}
