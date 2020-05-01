import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoinApiService } from './home.service';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CoinApiService]
})
export class CurrCardsComponent implements OnInit {

  result = [];
  baseImageUrl = 'https://www.cryptocompare.com';

  constructor(public navCtrl: NavController, private coinApiService: CoinApiService) { }

  ngOnInit() {
    this.coinApiService.getAllCoins().map(res => 
      res = _.sortBy(res.Data, o => parseInt(o.SortOrder))
    ).subscribe(
      resultArray => {
        let arr = [];
        let that = this;
        _.pickBy(resultArray, function (value, key, object) {
          if (parseInt(value.SortOrder) <= 20) {
            that.coinApiService.getCoinPriceUSD(value.Name).subscribe(
              res => {
                value.Price = res.USD;
              });
            arr.push(value);
          }
          return arr;
        });
        this.result = arr;
        console.log(this.result);
      },
      error => console.log("Error :: " + error)
    )
  }

}