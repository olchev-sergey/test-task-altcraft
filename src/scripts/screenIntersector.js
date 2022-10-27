export const screenIntersector = (container, callback) => {
  const screenObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    },
    { threshold: 0 }
  )

  screenObserver.observe(container)
}
