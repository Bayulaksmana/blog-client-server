import { AnimatePresence, motion } from "framer-motion"

const AnimationWrapper = ({ keyValue, className, children, initial = { opacity: 0 }, animate = { opacity: 1 }, transition = { duration: 1 } }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={keyValue}
                className={className}
                initial={initial}
                animate={animate}
                transition={transition}
            >
                <h1>{children}</h1>
            </motion.div>
        </AnimatePresence>
    )
}


export default AnimationWrapper