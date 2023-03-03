import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel({ images }) {

    const [render, setRender] = useState(false)

    useEffect(() => {
        // console.log(images)
    }, [render])

    function val() {
        if (render === false) {
            setRender(true)
        }
    }

    

    if (images) {
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
    } else {
        return (
            <p>No hay imagenes para mostrar</p>
        )
    }
}

export default Carrusel