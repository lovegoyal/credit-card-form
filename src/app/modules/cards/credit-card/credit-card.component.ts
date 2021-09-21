import { getCardType } from './card-type.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  //properties
  private _cardNumber:string = "#### #### #### ####";
  private _cardHolder: string = "AD SOYAD";
  private _cvv: string = "";
  private _expirationMonth: any = "MM";
  private _expirtationYear: string = "YY";
  private _cardType;

  private _isCardNumberFoucsed:boolean = false;
  private _isCardHolderFoucsed:boolean = false;
  private _isCVVFoucsed:boolean = false;
  private _isexpirationMonthFoucsed:boolean = false;
  private _isexpirationYearFocused:boolean = false;
  PrevValue: any=null;

  public get IsCardNumberFocused(){
    return this._isCardNumberFoucsed;
  }

  public set IsCardNumberFocused(value){
      this._isCardNumberFoucsed = value;
  }

  public get IsCardHolderFoucsed(){
    return this._isCardHolderFoucsed;
  }

  public set IsCardHolderFoucsed(value){
      this._isCardHolderFoucsed = value;
  }
  public get IsCVVFoucsed(){
    return this._isCVVFoucsed;
  }

  public set IsCVVFoucsed(value){
      this._isCVVFoucsed = value;
  }
  public get IsExpirationMonthFoucsed(){
    return this._isexpirationMonthFoucsed;
  }

  public set IsExpirationMonthFoucsed(value){
      this._isexpirationMonthFoucsed = value;
  }
  public get IsExpirationYearFocused(){
    return this._isexpirationYearFocused;
  }

  public set IsExpirationYearFocused(value){
      this._isexpirationYearFocused = value;
  }

  txtCardNumber:string="";

  monthList:Number[] = [1,2,3,4,5,6,7,8,9,10,11,12]

  yearList:Number[] = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030 ]

  //Card Number
  public get CardNumber(){
    return this._cardNumber
  }

  public set CardNumber(value){
    this._cardNumber = value;
  }

  //Card Holder
  public get CardHolder(){
    return this._cardHolder
  }

  public set CardHolder(value){
    this._cardHolder = value;
  }

  //CVV
  public get CVV(){
    return this._cvv
  }

  public set CVV(value){
    this._cvv = value;
  }

  //Expiration Month
  public get ExpirationMonth(){
    if(this._expirationMonth && !isNaN(Number(this._expirationMonth))){
      return this._decimalPipe.transform(this._expirationMonth,'2.0-0')
    }
    return "MM"
  }

  public set ExpirationMonth(value){
    this._expirationMonth = value;
  }

  //Expiration Year
  public set ExpirationYear(value){
    this._expirtationYear = value;
  }
  public get ExpirationYear(){
    return this._expirtationYear.toString().substr(-2);
  }

  //Card Type
  public set CardType(value){
    this._cardType = value;
  }
  public get CardType(){
    return this._cardType;
  }

  constructor(private _decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
  }

  changeCardValue(target, value){
     
    switch(target){
      case "cardnumber":
          if(this.PrevValue&&this.PrevValue.length>value.length){
            value = value.length<18 ? value.trim():value;
          } else{
            value = value.length<18 ? value.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 '):value;

          }
          this.CardNumber = value + "#### #### #### ####".slice(value.length)
          this.txtCardNumber = value
          this.CardType= getCardType(this.CardNumber.replace(" ",""))?.toLowerCase();
          this.PrevValue = value;
          break;

      case "cardholder":
          this.CardHolder = value;
          break;

      case "cvv":
          this.CVV = value;
          break;

      case "expirationmonth":
          this.ExpirationMonth = value;
          break;

      case "expirationyear":
          this.ExpirationYear = value;
          break;
    }
  }


  changeCardFocus(target){
          this.IsCardNumberFocused = (target=="cardnumber");
          this.IsCardHolderFoucsed = (target=="cardholder");
          this.IsCVVFoucsed = (target == "cvv");
          this.IsExpirationMonthFoucsed = (target=="expirationmonth")
          this.IsExpirationYearFocused = (target == "expirationyear")
    }

}
