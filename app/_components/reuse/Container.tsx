"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";
interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({
    children,
}: ContainerProps) => {
    const recaptchaKey: string | undefined =
    process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return (
        <div className="card-body">
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
        >
            {children}
        </GoogleReCaptchaProvider>
        </div>
    )
}