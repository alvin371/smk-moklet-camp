

const SuspenseLoading = ({ text }: { text?: string }) => {
    return (
        <div
            className="tw-flex tw-h-screen tw-flex-col tw-items-center tw-justify-center"
            style={{
                background:
                    "linear-gradient(90deg, #F2F5F9 0%, rgba(242, 245, 249, 0) 100%)",
            }}
        >
            {text && (
                <div className="tw-mb-[29px] tw-font-OpenSansSemiBold tw-text-2xl tw-font-semibold tw-text-bodyCopy">
                    {text}
                </div>
            )}
            <div>
                "Loadingg..."
            </div>
        </div>
    );
};

export default SuspenseLoading;
