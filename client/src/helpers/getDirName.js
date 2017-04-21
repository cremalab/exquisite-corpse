// Returns current directory name
// Used in stories/tests
// If there is a better way, tell me (Rob LaFeve)
export default path => path.match(/([^/]*)$/)[0]
