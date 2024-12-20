/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Me */
        get: operations["get_me_auth_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register */
        post: operations["register_auth_register_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login */
        post: operations["login_auth_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get All */
        get: operations["get_all_books__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/my_library": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Library */
        get: operations["get_library_books_my_library_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/{book_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get By Id */
        get: operations["get_by_id_books__book_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/{book_id}/purchase": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Purchase Book */
        post: operations["purchase_book_books__book_id__purchase_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/{book_id}/active_instance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Active Instance */
        get: operations["get_active_instance_books__book_id__active_instance_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/expiring_soon": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Expiring Soon */
        get: operations["get_expiring_soon_books_expiring_soon_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/orders/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get All */
        get: operations["get_all_orders__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login */
        post: operations["login_admin_auth_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/books/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get All */
        get: operations["get_all_admin_books__get"];
        put?: never;
        /** Create Book */
        post: operations["create_book_admin_books__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/books/{book_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get By Id */
        get: operations["get_by_id_admin_books__book_id__get"];
        /** Update Book */
        put: operations["update_book_admin_books__book_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/orders/{order_id}/complete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Complete Order */
        post: operations["complete_order_admin_orders__order_id__complete_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/orders/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Incomplete Orders */
        get: operations["get_incomplete_orders_admin_orders__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** AccessTokenDTO */
        AccessTokenDTO: {
            /** Token */
            token: string;
        };
        /** AdminBookDTO */
        AdminBookDTO: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Title */
            title: string;
            /** Author */
            author: string;
            /** Category */
            category: string;
            /** Purchase Price */
            purchase_price: number;
            /** Two Weeks Rent Price */
            two_weeks_rent_price: number;
            /** Month Rent Price */
            month_rent_price: number;
            /** Three Month Rent Price */
            three_month_rent_price: number;
            /** Year Published */
            year_published: number;
            /** Text */
            text: string;
            /** Is Hidden */
            is_hidden: boolean;
        };
        /** AdminOrderDTO */
        AdminOrderDTO: {
            book_instance: components["schemas"]["BookInstanceDTO"] | null;
            customer: components["schemas"]["CustomerDTO"];
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /** Price */
            price: number;
            status: components["schemas"]["OrderStatus"];
            purchase_type: components["schemas"]["PurchaseType"];
            /**
             * Book Id
             * Format: uuid
             */
            book_id: string;
            /** Book Instance Id */
            book_instance_id: string | null;
            book: components["schemas"]["AdminBookDTO"];
        };
        /** BookInstanceDTO */
        BookInstanceDTO: {
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /** Expiration Date */
            expiration_date: string | null;
            /**
             * Book Id
             * Format: uuid
             */
            book_id: string;
            book: components["schemas"]["CustomerBookInInstanceDTO"];
        };
        /** CreateBookDTO */
        CreateBookDTO: {
            /** Title */
            title: string;
            /** Author */
            author: string;
            /** Category */
            category: string;
            /** Purchase Price */
            purchase_price: number;
            /** Two Weeks Rent Price */
            two_weeks_rent_price: number;
            /** Month Rent Price */
            month_rent_price: number;
            /** Three Month Rent Price */
            three_month_rent_price: number;
            /** Year Published */
            year_published: number;
            /** Text */
            text: string;
            /** Is Hidden */
            is_hidden: boolean;
        };
        /** CustomerBookDTO */
        CustomerBookDTO: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Title */
            title: string;
            /** Category */
            category: string;
            /** Author */
            author: string;
            /** Purchase Price */
            purchase_price: number;
            /** Two Weeks Rent Price */
            two_weeks_rent_price: number;
            /** Month Rent Price */
            month_rent_price: number;
            /** Three Month Rent Price */
            three_month_rent_price: number;
            /** Year Published */
            year_published: number;
        };
        /** CustomerBookInInstanceDTO */
        CustomerBookInInstanceDTO: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Title */
            title: string;
            /** Category */
            category: string;
            /** Author */
            author: string;
            /** Purchase Price */
            purchase_price: number;
            /** Two Weeks Rent Price */
            two_weeks_rent_price: number;
            /** Month Rent Price */
            month_rent_price: number;
            /** Three Month Rent Price */
            three_month_rent_price: number;
            /** Year Published */
            year_published: number;
            /** Text */
            text: string;
        };
        /** CustomerDTO */
        CustomerDTO: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Username */
            username: string;
        };
        /** CustomerOrderDTO */
        CustomerOrderDTO: {
            book_instance: components["schemas"]["BookInstanceDTO"] | null;
            customer: components["schemas"]["CustomerDTO"];
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /** Price */
            price: number;
            status: components["schemas"]["OrderStatus"];
            purchase_type: components["schemas"]["PurchaseType"];
            /**
             * Book Id
             * Format: uuid
             */
            book_id: string;
            /** Book Instance Id */
            book_instance_id: string | null;
            book: components["schemas"]["CustomerBookDTO"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** LoginAdminDTO */
        LoginAdminDTO: {
            /**
             * Password
             * Format: password
             */
            password: string;
        };
        /** LoginCustomerDTO */
        LoginCustomerDTO: {
            /** Username */
            username: string;
            /**
             * Password
             * Format: password
             */
            password: string;
        };
        /**
         * OrderStatus
         * @enum {string}
         */
        OrderStatus: "awaiting_payment" | "completed" | "cancelled";
        /** PurchaseBookDTO */
        PurchaseBookDTO: {
            purchase_type: components["schemas"]["PurchaseType"];
        };
        /**
         * PurchaseType
         * @enum {string}
         */
        PurchaseType: "forever" | "two_weeks" | "month" | "three_months";
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type SchemaAccessTokenDto = components['schemas']['AccessTokenDTO'];
export type SchemaAdminBookDto = components['schemas']['AdminBookDTO'];
export type SchemaAdminOrderDto = components['schemas']['AdminOrderDTO'];
export type SchemaBookInstanceDto = components['schemas']['BookInstanceDTO'];
export type SchemaCreateBookDto = components['schemas']['CreateBookDTO'];
export type SchemaCustomerBookDto = components['schemas']['CustomerBookDTO'];
export type SchemaCustomerBookInInstanceDto = components['schemas']['CustomerBookInInstanceDTO'];
export type SchemaCustomerDto = components['schemas']['CustomerDTO'];
export type SchemaCustomerOrderDto = components['schemas']['CustomerOrderDTO'];
export type SchemaHttpValidationError = components['schemas']['HTTPValidationError'];
export type SchemaLoginAdminDto = components['schemas']['LoginAdminDTO'];
export type SchemaLoginCustomerDto = components['schemas']['LoginCustomerDTO'];
export type SchemaOrderStatus = components['schemas']['OrderStatus'];
export type SchemaPurchaseBookDto = components['schemas']['PurchaseBookDTO'];
export type SchemaPurchaseType = components['schemas']['PurchaseType'];
export type SchemaValidationError = components['schemas']['ValidationError'];
export type $defs = Record<string, never>;
export interface operations {
    get_me_auth_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerDTO"];
                };
            };
        };
    };
    register_auth_register_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginCustomerDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessTokenDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_auth_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginCustomerDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessTokenDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_all_books__get: {
        parameters: {
            query?: {
                author?: string | null;
                category?: string | null;
                year_published?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerBookDTO"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_library_books_my_library_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookInstanceDTO"][];
                };
            };
        };
    };
    get_by_id_books__book_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                book_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerBookDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    purchase_book_books__book_id__purchase_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                book_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PurchaseBookDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerOrderDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_active_instance_books__book_id__active_instance_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                book_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookInstanceDTO"] | null;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_expiring_soon_books_expiring_soon_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookInstanceDTO"][];
                };
            };
        };
    };
    get_all_orders__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerOrderDTO"][];
                };
            };
        };
    };
    login_admin_auth_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginAdminDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessTokenDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_all_admin_books__get: {
        parameters: {
            query?: {
                author?: string | null;
                category?: string | null;
                year_published?: number | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminBookDTO"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_book_admin_books__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateBookDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminBookDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_by_id_admin_books__book_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                book_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminBookDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_book_admin_books__book_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                book_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateBookDTO"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminBookDTO"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    complete_order_admin_orders__order_id__complete_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                order_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_incomplete_orders_admin_orders__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminOrderDTO"][];
                };
            };
        };
    };
}
