<?php

function minmaxriddle($arr) {
    $n = count($arr);

    // Step 1: Initialize prev_smaller and next_smaller
    $prev_smaller = array_fill(0, $n, -1);
    $next_smaller = array_fill(0, $n, $n);
    $stack = [];

    // Calculate prev_smaller
    for ($i = 0; $i < $n; $i++) {
        while (!empty($stack) && $arr[$stack[count($stack) - 1]] >= $arr[$i]) {
            array_pop($stack);
        }
        if (!empty($stack)) {
            $prev_smaller[$i] = $stack[count($stack) - 1];
        }
        $stack[] = $i;
    }

    // Clear stack and calculate next_smaller
    $stack = [];
    for ($i = $n - 1; $i >= 0; $i--) {
        while (!empty($stack) && $arr[$stack[count($stack) - 1]] >= $arr[$i]) {
            array_pop($stack);
        }
        if (!empty($stack)) {
            $next_smaller[$i] = $stack[count($stack) - 1];
        }
        $stack[] = $i;
    }

    // Step 2: Calculate result array
    $result = array_fill(0, $n, PHP_INT_MIN);
    for ($i = 0; $i < $n; $i++) {
        $window_size = $next_smaller[$i] - $prev_smaller[$i] - 1;
        $result[$window_size - 1] = max($result[$window_size - 1], $arr[$i]);
    }

    // Step 3: Propagate maximums to smaller windows
    for ($i = $n - 2; $i >= 0; $i--) {
        $result[$i] = max($result[$i], $result[$i + 1]);
    }

    return $result;
}

$arr = [2, 6, 1, 12];
print_r(minmaxriddle($arr));    // [12, 2, 1, 1]

?>