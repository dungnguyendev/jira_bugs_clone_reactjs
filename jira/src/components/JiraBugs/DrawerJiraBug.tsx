import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { DrawerProjectAction } from '../../store/DrawerJiraBugs/slice';

const App: React.FC = (props) => {



    const [size, setSize] = useState<DrawerProps['size']>();
    const { setOpenReducer, ComponentContentDrawer, callBackSubmit, title } = useSelector((state: RootState) => state.drawer)
    const AppDispatch = useAppDispatch()

    // const showDefaultDrawer = () => {
    //     AppDispatch(DrawerProjectAction.OPEN_DRAWER({}))
    //     // setSize('default');

    // };

    const showLargeDrawer = () => {

        setSize('large');

    };

    const onClose = () => {
        AppDispatch(DrawerProjectAction.CLOSE_DRAWER({}))

    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                placement="right"
                size={size}
                onClose={onClose}
                open={setOpenReducer}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" className='bg-blue-500' onClick={callBackSubmit}>
                            {title}
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>

    );
};

export default App;