export interface ButtonT {
  title: string
  onPress?: () => void
  isSelected?: boolean
  primary?: boolean
  icon?: "pluscircleo"
  secondary?: boolean
}