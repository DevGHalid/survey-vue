<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>app</title>

        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    </head>
    <body>

        <div id="app"></div>

        <script>
            var BASE_URL = "{{ url('/') }}";
        </script>
        <script src="{{ asset('/js/app.js') }}"></script>
    </body>
</html>
