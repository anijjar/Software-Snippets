# Modal Controller

A stimulus controller I built to handle showing/hiding modals and form submissions in rails.

Turbo is a new feature in Rails 7 to allow for single page applications. It allows controller actions to be requested asynchronously using turbo_frames, avoiding costly full page refreshes. The downside is the form submissions dont issue a full page refresh, requiring custom handling. 

Update (Version 2): I am not handling submissions no more because I can enforce a full page submission by targeting the _top element, simplifying the controller greatly.

## Example (Ruby on Rails)

<%= content_tag :div, data: {controller: 'date-of-birth'}, class: section_modal do %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-month", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_month', name: 'user[birthday(2i)]'} %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-day", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_day', name: 'user[birthday(3i)]'} %>
  <%= f.select :birthday, [], {}, {autocomplete: "bday-year", required: true, class: "#{dropDown_modal} #{field_modal}", id: 'bday_year', name: 'user[birthday(1i)]'} %>
<% end %>

