import { Api } from '@/services/api';

export class HomeService extends Api {
    constructor() {
        super()
    }

    public getDataHome() : string {
        return 'home';
    }

    /**
     * Examplo de função de api
     *
     * public getDataHome() : Promise<MyInterface> {
     *   return this.get('/api/v1/home');
     * }
    */
}