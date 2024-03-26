# Date of Birth Controller

A stimulus controller for hotwire application (Ruby on Rails) that can dynamically generate the correct days of the month depending on the year and month.

When the controller is embedded on a page, it looks for the ids "bday-month, bday-day, and bday-year" to connect with. It assigns default values depending on the current year. When the user selects a new month, the days are recalculated.  

## Example (Ruby on Rails)

<%= content_tag :div, data: {controller: 'date-of-birth'}, class: section_modal do %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-month", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_month', name: 'user[birthday(2i)]'} %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-day", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_day', name: 'user[birthday(3i)]'} %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-year", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_year', name: 'user[birthday(1i)]'} %>
<% end %>

