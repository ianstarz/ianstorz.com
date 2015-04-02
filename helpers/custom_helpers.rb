module CustomHelpers
  def canonical_link_tag
    path = '/' + current_page.destination_path
    path = '' if path == '/index' || path == '/index.html'
    href = preferred_origin + path
    %Q(<link rel="canonical" href="#{href}" />)
  end
end
