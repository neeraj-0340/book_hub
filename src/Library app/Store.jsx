import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './Bookslice';

const Book = configureStore({
    reducer: {
        book: bookReducer,
    },
});

export default Book;