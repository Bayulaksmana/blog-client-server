import { UserContext } from "@/common/user.context"
import BlogEditor from "@/components/blog.editor.component"
import PublishForm from "@/components/publish-form.component"
import { useContext, useState } from "react"
import { Navigate } from "react-router"

const Editor = () => {
    const [editorState, setEditorState] = useState("editor")
    let { userAuth: { access_token } } = useContext(UserContext)
    return (
        access_token === null ? <Navigate to="/signin" />
            : editorState == "editor" ? <BlogEditor /> : <PublishForm />
    )
}

export default Editor