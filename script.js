const cartvalue = document.getElementById('cart-value');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart value on page load
cartvalue.innerHTML = cart.length;

const movies = [
    {
        title: "Doctor Strange 2",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/Doctor-Strange--In-The-Multiverse-Of-Madness-r-705x750-36f0e140-b752-11ec-a762-319bdb0970f2.jpg",
        price: 12.99 // price in dollars
    },
    {
        title: "Bhool Bhulaiyaa 2",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/bb2--705x750-cbc15240-8a94-11ec-8efd-6d205f33f529.jpg",
        price: 10.99
    },
    {
        title: "Jayeshbhai Jordaar",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/Jayeshbhai-Jordaar---705x750-660c01c0-cf7c-11ec-98b3-41c37f260d1c.jpg",
        price: 8.99
    },
    {
        title: "Jurassic World",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/Jurassic-World--Dominion-705x750-b554ee90-cd51-11ec-8d22-2363945d80ef.jpg",
        price: 15.99
    },
    {
        title: "KGF2",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/KGF-705x750-76008750-b6fd-11ec-9639-8322852eadd4.jpg",
        price: 14.99
    },
    {
        title: "RRR",
        rating: "4.5",
        img: "https://assetscdn1.paytm.com/images/cinema/RRR-North-705x750-fd78d9c0-693d-11ec-bbcd-5d122dc4018b.jpg",
        price: 13.99
    }
];

const container = document.getElementById('movie-container');

movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    movieCard.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <div>
            <h2>${movie.title}</h2>
            <p>Rating: ${movie.rating}</p>
            <p>Price: $${movie.price.toFixed(2)}</p>
            <label for="quantity-${movie.title.replace(/\s+/g, '-')}-input">Quantity:</label>
            <input type="number" id="quantity-${movie.title.replace(/\s+/g, '-')}-input" value="1" min="1">
            <button class="book-button">Book now</button>
        </div>
    `;

    movieCard.querySelector('.book-button').addEventListener('click', () => {
        const quantityInput = movieCard.querySelector(`input[type="number"]`);
        const quantity = parseInt(quantityInput.value, 10);

        // Validate quantity input
        if (isNaN(quantity) || quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

        const existingMovieIndex = cart.findIndex(item => item.title === movie.title);
        if (existingMovieIndex > -1) {
            // Update existing movie in cart
            cart[existingMovieIndex].quantity += quantity;
            cart[existingMovieIndex].totalPrice = (cart[existingMovieIndex].price * cart[existingMovieIndex].quantity).toFixed(2);
        } else {
            // Create a new cart item
            const cartItem = {
                ...movie,
                quantity: quantity,
                totalPrice: (movie.price * quantity).toFixed(2)
            };
            cart.push(cartItem);
        }

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart value display
        cartvalue.innerHTML = cart.length;
    });

    container.appendChild(movieCard);
});
