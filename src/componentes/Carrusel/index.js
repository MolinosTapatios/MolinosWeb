import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
//import url
import {URL} from 'services/config'

function Carrusel({ images }) {

    const [render, setRender] = useState(false)

    useEffect(() => {
    }, [render])

    function val() {
        if (render === false) {
            setRender(true)
        }
    }

    

    if (images) {
        return (
            <Carousel onClick={val} className="m-1">
                {
                    images.map((img, i) =>
                        <div className='carousel-item' key={i}>
                            <img
                                className="d-block w-100"
                                src={URL + img.path}
                                alt="First slide"
                            />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </div>
                    )
                }
            </Carousel>
        )
    } else {
        return (
            <p>No hay imagenes para mostrar</p>
        )
    }
}

export default Carrusel