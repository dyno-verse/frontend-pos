// import { $Fetch } from 'ohmyfetch';
// @ts-ignore
import {$Fetch} from "ofetch";


class HttpFactory {
    private readonly $fetch: $Fetch;

    constructor(fetcher: $Fetch) {
        this.$fetch = fetcher;
    }

    /**
     * method - GET, POST, PUT
     * URL
     **/
    async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
        return await this.$fetch(url,
            {
                method: method,
                // query: request.query,
                body: data, ...extras
            }
        );
    }
}

export default HttpFactory;
