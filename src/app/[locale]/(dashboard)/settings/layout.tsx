import React from 'react'
import SettingLayout from '../../../../components/layouts/setting';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SettingLayout>
            {children}
        </SettingLayout>
    )
}

export default SettingsLayout