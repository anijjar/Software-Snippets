# Modal Controller

A stimulus controller I built to handle showing/hiding modals and form submissions in rails.

Turbo is a new feature in Rails 7 to allow for single page applications. It allows controller actions to be requested asynchronously using turbo_frames, avoiding costly full page refreshes. The downside is the form submissions dont issue a full page refresh, requiring custom handling. 

Update (Version 2): I am not handling submissions no more because I can enforce a full page reload by targeting the _top element, simplifying the controller greatly.

## Example 1 (Ruby on Rails)

<%= content_tag :div, nil, data: {modal_target: :modal}, class: "fixed z-10 inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm transition-all duration-100 ease-in-out opacity-0 hidden" do %>
    <%= content_tag :div, nil, class: "container rounded-xl mx-auto max-w-xs sm:max-w-sm p-3 bg-magic-mint-50 border-4 border-magic-mint-800" do %>
        <div class="flex flex-row items-center justify-between">
            <%= content_tag :h1, nil, data: {modal_target: :header}, class: h_modal %>
            <i class="bi bi-x-lg transition hover:ease-linear duration-200 cursor-pointer border-4 border-magic-mint-800 shadow-lg rounded-md" data-action="click->modal#close"></i>
        </div>
        <hr class="relative flex w-full py-1 items-center border-t border-solid border-magic-mint-900">
        <%= turbo_frame_tag :modalContent, data: {modal_target: :content} do %>   
            <!-- Content goes here-->
        <% end %>
    <% end %>
<% end %>



## Example 2 (Ruby on Rails)

<%= content_tag :div, nil, data: {modal_target: :modal}, class: "fixed z-10 inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm transition-all duration-100 ease-in-out opacity-0 hidden" do %>
  <%= content_tag :div, class: "mx-4 #{page_content_modal}" do %>
    <div class="p-4 sm:p-6">
      <i class="bi bi-x-lg absolute cursor-pointer" data-action="click->modal#close"></i>
      <%= turbo_frame_tag :modalContent, data: {modal_target: :content} do %>   
      <!-- Content goes here-->
      <% end %>
    </div>
  <% end %>

<% end %>