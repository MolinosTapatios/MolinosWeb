import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel({ images }) {

    const [render, setRender] = useState(false)

    useEffect(() => {
    }, [render])

    function val(params) {
        if (render === false) {
            setRender(true)
        }
    }

    if (images) {
        return (
            <Carousel onClick={val}>
                {
                    images.map(img =>
                        <Carousel.Item key={img.id}>
                            <img
                                className="d-block w-100"
                                src={img.path}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <p>...</p>
                            </Carousel.Caption>
                        </Carousel.Item>
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