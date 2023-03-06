import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { URL } from 'services/config';

function Carrusel({ images = [] }) {

    const [render, setRender] = useState(false)

    function val() {
        if (render === false) {
            setRender(true)
        }
    }

    if (images.length === 0) {
        images[0] = {id:0, path:`${URL}/img/null.jpg`}
    }
        return (
            <Carousel onClick={val} className="m-1" id="carrusel">
                {
                    images.map((img, i) =>
                        <div className='carousel-item' key={i}>
                            <img
                                id={img.id}
                                className="d-block w-100"
                                src={img.path}
                                alt="First slide"
                                style={{maxHeight:"300px", width:"auto"}}
                            />
                            {/* <Carousel.Caption>

                            </Carousel.Caption> */}
                        </div>
                    )
                }
            </Carousel>
        )
}

export default Carrusel