# Toast Controller

A stimulus controller that reads and displays flash messages on page refresh or through an event listener for single page applications.

Input: JSON formated string {type: x, message: y} (either singular or a list [])

## Example 1 (Ruby on Rails)

<%= content_tag :div, nil, data: {controller: "toast", toast_flash_value: flash.map { |type, message| { type: type, message: message } }}, class: "fixed z-10 right-0 bottom-0 m-6 p-2 rounded shadow-xl opacity-0 transition-opacity duration-500 ease-in-out border-4 whitespace-nowrap" do %><% end %>
