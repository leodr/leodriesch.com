export function Iframe({ src }) {
    return (
        <div className="-mx-3 sm:-mx-6 overflow-hidden shadow-lg sm:rounded-md aspect-w-3 aspect-h-3 sm:aspect-h-2">
            <iframe
                src={src}
                title="Demo of Using a Status for HTTP-Requests in React"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
        </div>
    )
}
