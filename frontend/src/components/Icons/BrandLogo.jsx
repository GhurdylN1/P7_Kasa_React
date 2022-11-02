function BrandLogo(props) {
  return (
    <svg
      className={props.className}
      alt={props.alt}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 145 47"
    >
      <g fill={props.color}>
        <path d="m13.84 23.948-7.745 7.94V43.03H0V0h6.095v24.076L29.203 0h6.984L18.03 19.338 37.456 43.03h-7.11L13.84 23.948ZM81.896 39.572l2.412-4.61c2.793 1.92 7.11 3.33 11.3 3.33 5.46 0 7.619-1.665 7.619-4.483 0-7.3-20.443-1.024-20.443-13.959 0-5.89 5.206-9.733 13.46-9.733 4.189 0 9.014 1.153 11.808 2.946l-2.54 4.61c-2.92-1.92-6.094-2.561-9.269-2.561-5.078 0-7.618 1.92-7.618 4.482 0 7.684 20.442 1.409 20.442 14.087 0 5.891-5.332 9.605-13.966 9.605-5.206.128-10.539-1.537-13.205-3.714ZM145 23.308V43.03h-5.587v-4.354c-1.904 2.945-5.586 4.61-10.665 4.61-7.364 0-11.935-3.97-11.935-9.605 0-5.25 3.301-9.477 12.951-9.477h9.268v-1.152c0-4.995-2.92-7.812-8.634-7.812-3.809 0-7.745 1.408-10.284 3.458l-2.413-4.483c3.302-2.69 8.127-4.226 13.332-4.226 9.015.128 13.967 4.482 13.967 13.319Zm-5.841 9.733v-4.61h-9.014c-5.841 0-7.492 2.305-7.492 4.994 0 3.202 2.667 5.25 7.111 5.25 4.444.129 7.999-1.792 9.395-5.634ZM63.104 34.45v8.708l3.682-2.177v-8.709l-3.682 2.178Z" />
        <path d="m73.262 23.82-15.11-8.836-8.38-4.867L41.52 24.59l.127 13.575L56.63 47l1.523-.896V33.297l6.73-11.91 6.856 3.97v12.806l1.524-.896V23.82Z" />
      </g>
    </svg>
  )
}

export default BrandLogo
