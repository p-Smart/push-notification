import { toast } from "react-hot-toast"


const copyToClipboard = (textToCopy, successMessage) => 
  navigator.clipboard.writeText(textToCopy)
    .then(() => toast.success(successMessage || 'Text Copied to Clipboard'))
    .catch((err) => {
        toast.error('Error copying to clipboard, try later')
        console.error('Unable to copy text to clipboard', err)
    });


export default copyToClipboard
