// Vue 3 app instance
const app = Vue.createApp({
    data() {
        return {
            // Sample product data (to be fetched from a backend)
            products: [
                {
                    id: 1,
                    name: "HOT PINK GLOSS",
                    description: "Beautiful glossy shimmery gloss perfect for your glam look.",
                    price: 25.99,
                    image: "images/product1.jpg",
                    available: true // Add availability property
                },
                {
                    id: 2,
                    name: "DEEP RED GLOSS",
                    description: "Make a statement with this deep red shade.",
                    price: 25.99,
                    image: "images/product2.jpg",
                    available: false // Add availability property
                },
                // Add more products here
            ],
            cart: [] // Initialize a cart array
        };
    },
    computed: {
        cartTotal() {
            // Calculate the total price of items in the cart
            return this.cart.reduce((total, product) => total + product.price, 0);
        }
    },
    methods: {
        addToCart(product) {
            // Add a product to the cart
            this.cart.push(product);
            this.$emit('add-to-cart', product);
        },
        removeFromCart(product) {
            // Remove a product from the cart
            const index = this.cart.indexOf(product);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    },
    created() {
        console.log("Vue app is created.");
    }
});

// Product component
app.component('product-card', {
    props: ['product'],
    template: `
        <div class="product-card">
            <img :src="product.image" :alt="product.name">
            <h2>{{ product.name }}</h2>
            <p class="description">{{ product.description }}</p>
            <p class="price">\${{ product.price.toFixed(2) }}</p>
            <p v-if="product.available">In Stock</p>
            <p v-else>Out of Stock</p>
            <button @click="addToCart(product)">Add to Cart</button>
        </div>
    `
});


// Cart component
app.component('cart', {
    computed: {
        cartItemCount() {
            // Calculate the number of items in the cart
            return this.$root.cart.length;
        }
    },
    template: `
        <div class="cart">
            <h2>Your Cart</h2>
            <ul>
                <li v-for="product in $root.cart" :key="product.id">
                    {{ product.name }} - \${{ product.price.toFixed(2) }}
                    <button @click="removeFromCart(product)">Remove</button>
                </li>
            </ul>
            <p>Total: \${{ $root.cartTotal.toFixed(2) }}</p>
        </div>
    `
});


// Mount the app to an element with the id "product-listings"
const mountedApp = app.mount('#product-listings');

// Mount the cart component to an element with the id "cart"
const cartApp = app.mount('#cart');



// Import Vue and Vue Router
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import your components for each route
import Home from './components/Home.vue'
import Product from './components/Product.vue'
import Cart from './components/Cart.vue'

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
  ],
})

// Create a Vue app instance and mount it to '#app'
const mainapp = createApp(MainApp)
mainappapp.use(router)
mainappapp.mount('#app')

