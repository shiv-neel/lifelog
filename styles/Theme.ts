import { extendTheme } from "@chakra-ui/react"
import '@fontsource/courier-prime'
import '@fontsource/manrope'

const theme = extendTheme({
    fonts: {
        heading: 'Manrope',
        body: 'Manrope',
        code: 'Courier Prime'
    }
})

export default theme