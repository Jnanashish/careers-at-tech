import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Customdrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <>
            <button onClick={toggleDrawer}>Show</button>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="bottom" className="bla bla bla">
                <div>Hello World</div>
            </Drawer>
        </>
    );
};

export default Customdrawer;
