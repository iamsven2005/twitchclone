"use client";
interface ContainerProps {
    children: React.ReactNode;
};
export const Container = ({
    children,
}: ContainerProps) => {
    return (
        <div className="card-body">
            {children}
        </div>
    )
}