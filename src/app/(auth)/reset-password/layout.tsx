import React, { ReactNode } from 'react';

const layout = async ({
    resetpassword
}:{
    resetpassword:ReactNode;
}) => {
    return (
        <div className="min-h-screen flex fexl-col justify-center
        items-center
        bg-gradient-to-b dark:from-slate-900/15 dark:to-slate-900/70 from-sky-900/45 to-sky-100/25  font-sans antialiased"
        >
            <section>{resetpassword}</section>
        </div>
    );
};

export default layout;