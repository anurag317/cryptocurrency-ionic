import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class CoinApiService {

    constructor(private http: Http) {
    }

    getAllCoins(): Observable<any> {
        return this.http
            .get('https://min-api.cryptocompare.com/data/all/coinlist')
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getCoinPriceUSD(coinName): Observable<any> {
        return this.http
            .get('https://min-api.cryptocompare.com/data/price?fsym=' + coinName + '&tsyms=USD')
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}