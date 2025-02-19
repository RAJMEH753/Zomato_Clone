import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Modal from "react-modal";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../Styles/detailsPage.css'

//styles for modal
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: [],
            resId: undefined,
            galleryModal: false,
            menuModal: false,
            menu: [],
            formModal:false
        }
    }

    componentDidMount() {
        const q = queryString.parse(window.location.search);
        // console.log(q);
        const { restuarant } = q
        // console.log(restaurant);

        axios({
            url: `http://localhost:5500/restaurants/${restuarant}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurant, resId: restuarant })
            })
            .catch((err => console.log(err)))
    }

    //for modal
    handleModal = (state, value) => {
        const { resId } = this.state;

        if (state == "menuModal" && value == true) {
            axios({
                url: `http://localhost:5500/menu/${resId}`,
                method: 'get',
                headers: { 'Content-Type': 'application/JSON' }
            })
                .then(res => {
                    this.setState({ menu: res.data.menuItem })
                })
                .catch((err => console.log(err)))
        }

        this.setState({ [state]: value });
    }

    //adding a number of elements
    addItems = (index, operationType) =>{
        var total = 0;
        const items= [...this.state.menu];
        const item = items[index];

        if(operationType =='add'){
            item.qty += 1;
        }
        else{
            item.qty -= 1;
        }

        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;
        })
        this.setState({ menu: items, subtotal: total })
    }

    render() {
        const { restaurant, galleryModal, menuModal, menu, subtotal, formModal } = this.state;
        return (
            <div>
                {/*<!--Navbar-->*/}
                <nav class="navbar bg-danger" data-bs-theme="">
                    <div class="container">
                        <div class="navbar-brand text-danger circle">
                            <h2 class="logo">e!</h2>
                        </div>
                        <form class="d-flex nav-form">
                            <button type="button" class="btn btn-danger">Login</button>
                            <button type="button" class="btn btn-outline-light">Create an account</button>
                        </form>
                    </div>
                </nav>

                <div className='Container'>
                    <div className='bannerCover'>
                        <img src={restaurant.thumb} className='banner' />
                        <input type="button" value="Click to see Image Gallery" className="gallery_button" onClick={() => this.handleModal('galleryModal', true)} />
                    </div>
                    <h2 className='heading mt-4 ms-5'>{restaurant.name}</h2>

                    <div>
                        <input type="button" className="btn btn-danger order_button" value="Place Online Order" onClick={() => this.handleModal('menuModal', true)} />
                    </div>

                    {/*Tabs */}
                    <div className='tabs'>
                        <div className='tab'>
                            <input type='radio' className='' id='tab-1' name='tab-group' checked />
                            <label htmlFor='tab-1' > Overview</label>

                            <div className='content'>
                                <div className='about'>About this place  </div>

                                <div className='head'>Cuisine</div>
                                <div className='value'>
                                    {restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cu => `${cu.name}, `)}
                                </div>

                                <div className='head'>Average Cost</div>
                                <div className='value'>₹{restaurant.cost} for two people (approx.)</div>

                            </div>

                        </div>

                        <div className='tab ms-4'>

                            <input type='radio' className='' id='tab-2' name='tab-group' />
                            <label htmlFor='tab-2'> Contact</label>

                            <div className='content'>

                                <div className='value'>Phone Number</div>
                                <div className='value-red'>+91 {restaurant.contact_number}</div>

                                <div className='head'>{restaurant.name}</div>
                                <div className='value'>{restaurant.address}</div>

                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={galleryModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('galleryModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                    <div>
                        <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                            <div>
                                <img src={restaurant.thumb} className="gallery_img" />
                            </div>
                        </Carousel>
                    </div>
                </Modal>


                {/* for place online order */}
                <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('menuModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                    <div>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        {/* Menu Item */}
                        {menu?.map((item, index) => {
                            return (
                                <div>
                                    <div className='menu_body'>
                                        <h5 className="font_weight">{item.name}</h5>
                                        <h5 className="font_weight">₹ {item.price}</h5>
                                        <p className="item_details">{item.description}</p>
                                    </div>
                                    <div className='menu_image'>
                                        <img className="item_image" src={`./img/${item.image}`} alt="food" />

                                        {
                                            item.qty == 0 ? <div className='item_quantity_button' onClick={() => this.addItems(index, 'add')}>
                                                ADD
                                            </div> : <div className='item_quantity'>
                                                <button onClick={() => this.addItems(index, 'sub')}> - </button>
                                                <span className='qty'>{item.qty}</span>
                                                <button onClick={() => this.addItems(index, 'add')}> + </button>
                                            </div>
                                        }

                                    </div>
                                </div>
                            )
                        })}

                        {/* Payment Details */}
                        <div className='payment'>
                            <h4 className="total font_weight">Subtotal: ₹ {subtotal}</h4>
                            <button className="btn btn-danger payment_button" onClick={() => {this.handleModal('menuModal', false); this.handleModal('formModal', true);}}>
                                Pay Now
                            </button>
                        </div>

                    </div>
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('formModal', false)} className="close"> <i class="bi bi-x-lg"></i></div>
                    <div>
                    <div style={{ width: '20em' }}>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        <label htmlFor="name" style={{ marginTop: '10px' }}>Name</label>
                        <input type="text" placeholder="Enter your name" style={{ width: '100%'}} className="form-control" id="name" />

                        <label htmlFor="mobile" style={{ marginTop: '10px' }}>Mobile Number</label>
                        <input type="text" placeholder="Enter mobile number" style={{ width: '100%'}} className="form-control" id="mobile" />

                        <label htmlFor="address" style={{ marginTop: '10px' }}>Address</label>
                        <textarea type="text" rows="4" placeholder="Enter your address" style={{ width: '100%'}} className="form-control" id="address">
                        </textarea>

                        <button className="btn btn-success" style={{ float: "right", marginTop: "18px" }}>Proceed</button>
                    </div>
                    </div>
                </Modal>

            </div>
        )
    }
}


export default Details;