import { Component, OnInit } from '@angular/core';
import { CardsService } from './Service/cards.service'; 
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card:Card ={
    id:'',
    cardholderName: '',
    cardNumber:'',
    cvc:'',
    expiryMonth:'',
    expiryYear:''

  }

  constructor(private cardService:CardsService){

  }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    this.cardService.getAllCards().subscribe(
      response => {
        this.cards = response;
      }
    );
  }

  onSubmit(){
    if(this.card.id === '')
    {
      this.cardService.addCard(this.card)
      .subscribe(
          response => {
            
      this.getAllCards();
      this.card ={
        id:'',
        cardholderName: '',
        cardNumber:'',
        cvc:'',
        expiryMonth:'',
        expiryYear:''
    
          }
        }

      )
    }
    else
    {
      this.UpdateCard(this.card);
    }
  }

  UpdateCard(card:Card)
  {
    this.cardService.updateCard(card).subscribe(
      response => {
        this.getAllCards();
        this.card ={
        id:'',
        cardholderName: '',
        cardNumber:'',
        cvc:'',
        expiryMonth:'',
        expiryYear:''
    
          }
        }      
    )
  }

  

  deleteCard(id:string)
  {
    this.cardService.deleteCard(id).subscribe(
      response =>{
        this.getAllCards();
      }
    )
  }
  

  populateCard(card:Card)
  {
    this.card = card;
  }
}
