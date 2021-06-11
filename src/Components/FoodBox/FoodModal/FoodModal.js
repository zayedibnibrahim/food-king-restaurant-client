import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const FoodModal = ({ open, handleClose, addProductClickHandler, eachProduct }) => {
    const { name, price, image, categoryId, addon } = eachProduct;
    console.log(addon)
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="row">

                            <div className="food-img col-md-5">
                                <img src={image.url} alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-7">
                                <h4>{name}</h4>
                                <h4>${price}</h4>
                                <p>Category: {categoryId.category}</p>
                                <p>Addons: {
                                    addon.map(adn => <ul><li key={adn._id}>{adn.addon}</li></ul>)
                                    }</p>
                                <button onClick={() => addProductClickHandler(eachProduct)} className="add-to-cart-btn-modal">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default FoodModal;